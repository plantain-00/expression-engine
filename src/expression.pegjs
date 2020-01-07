{
  function buildBinaryExpression(head, tail) {
    return tail.reduce(function (result, element) {
      var range
      if (tail.length === 1) {
        var loc = location()
        range = [loc.start.offset, loc.end.offset]
      } else {
        range = [result.range[0], element[3].range[1]]
        if (result.parenthesesRange) {
          range[0] = result.parenthesesRange[0]
        }
        if (element[3].parenthesesRange) {
          range[1] = element[3].parenthesesRange[1]
        }
      }
      delete result.parenthesesRange
      delete element[3].parenthesesRange
      return {
        type: 'BinaryExpression',
        operator: element[1],
        left: result,
        right: element[3],
        range: range
      }
    }, head)
  }

  function buildLogicalExpression(head, tail) {
    return tail.reduce(function (result, element) {
      var range
      if (tail.length === 1) {
        var loc = location()
        range = [loc.start.offset, loc.end.offset]
      } else {
        range = [result.range[0], element[3].range[1]]
      }
      return {
        type: 'LogicalExpression',
        operator: element[1] === 'and' ? '&&' : (element[1] === 'or' ? '||' : element[1]),
        left: result,
        right: element[3],
        range: range
      }
    }, head)
  }

  function buildNumericLiteral(value) {
    var loc = location()
    return {
      type: "NumericLiteral",
      value: value,
      range: [loc.start.offset, loc.end.offset]
    }
  }

  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }

  function buildList(head, tail, index) {
    return [head].concat(extractList(tail, index));
  }

  function filledArray(count, value) {
    return Array.apply(null, new Array(count))
      .map(function() { return value; });
  }

  function optionalList(value) {
    return value !== null ? value : [];
  }

  function extractOptional(optional, index) {
    return optional ? optional[index] : null;
  }
}

Expression = ConditionalExpression

ConditionalExpression
  = test:PipelineBinaryExpression _
    "?" _ consequent:Expression _
    ":" _ alternate:Expression
    {
      var loc = location()
      return {
        type: "ConditionalExpression",
        test: test,
        consequent: consequent,
        alternate: alternate,
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / PipelineBinaryExpression

PipelineBinaryExpression
  = head:OrLogicalExpression tail:(_ ("|>") _ OrLogicalExpression)* {
      return buildBinaryExpression(head, tail);
    }

OrLogicalExpression
  = head:BitwiseOrBinaryExpression tail:(_ ("||" / "or" / "??") _ BitwiseOrBinaryExpression)* {
      return buildLogicalExpression(head, tail);
    }

BitwiseOrBinaryExpression
  = head:BitwiseXorBinaryExpression tail:(_ ("|") _ BitwiseXorBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

BitwiseXorBinaryExpression
  = head:BitwiseAndBinaryExpression tail:(_ ("^") _ BitwiseAndBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

BitwiseAndBinaryExpression
  = head:AndLogicalExpression tail:(_ ("&") _ AndLogicalExpression)* {
      return buildBinaryExpression(head, tail);
    }

AndLogicalExpression
  = head:EqualityBinaryExpression tail:(_ ("&&" / "and") _ EqualityBinaryExpression)* {
      return buildLogicalExpression(head, tail);
    }

EqualityBinaryExpression
  = head:ComparisonBinaryExpression tail:(_ ("===" / "!==" / "==" / "!=") _ ComparisonBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

ComparisonBinaryExpression
  = head:ShiftBinaryExpression tail:(_ ("<=" / ">=" / ">" / "<") _ ShiftBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

ShiftBinaryExpression
  = head:AdditiveBinaryExpression tail:(_ (">>>" / "<<" / ">>") _ AdditiveBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

AdditiveBinaryExpression
  = head:MultiplicativeBinaryExpression tail:(_ ("+" / "-") _ MultiplicativeBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

MultiplicativeBinaryExpression
  = head:ExponentiationBinaryExpression tail:(_ ("*" / "/" / "%") _ ExponentiationBinaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

ExponentiationBinaryExpression
  = head:PrefixUnaryExpression tail:(_ ("**") _ PrefixUnaryExpression)* {
      return buildBinaryExpression(head, tail);
    }

PrefixUnaryExpression
  = operator:PrefixUnaryOperator _ argument:CallExpression {
      var loc = location()
      return {
        type: 'UnaryExpression',
        operator: operator === 'not' ? '!' : operator,
        argument: argument,
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / CallExpression

CallExpression
  = callee:MemberExpression _ args:Arguments {
      var loc = location()
      return {
        type: "CallExpression",
        callee: callee,
        arguments: args,
        range: [loc.start.offset, loc.end.offset],
      };
    }
  / callee:MemberExpression _ '?.' args:Arguments {
      var loc = location()
      return {
        type: "CallExpression",
        callee: callee,
        arguments: args,
        optional: true,
        range: [loc.start.offset, loc.end.offset],
      };
    }
  / MemberExpression

Arguments
  = "(" _ args:(ArgumentList _)? ")" {
      return optionalList(extractOptional(args, 0));
    }

ArgumentList
  = spread:"..."? head:MemberExpression tail:(_ "," _ MemberExpression)* {
      if (spread) {
        head = {
          type: 'SpreadElement',
          argument: head,
          range: [head.range[0] - 3, head.range[1]],
        }
      }
      return buildList(head, tail, 3);
    }

MemberExpression
  = head:ParenthesesExpression tail:(
        _ optional:"?."? "[" _ property:Expression _ "]" {
          property.inBrackets = true
          if (optional) {
            property.optional = true
          }
          return property;
        }
      / _ optional:"?"? "." _ property:Identifier {
          if (optional) {
            property.optional = true
          }
          return property;
        }
    )*
    {
      return tail.reduce(function(result, property) {
        var range
        if (tail.length === 1) {
          var loc = location()
          range = [loc.start.offset, loc.end.offset]
        } else {
          range = [result.range[0], property.range[1]]
          if (property.inBrackets) {
            range[1]++
          }
        }
        delete property.inBrackets
        if (property.optional) {
          delete property.optional
          return {
            type: 'MemberExpression',
            object: result,
            property: property,
            range: range,
            optional: true,
          };
        }
        return {
          type: 'MemberExpression',
          object: result,
          property: property,
          range: range,
        };
      }, head);
    }

ParenthesesExpression
  = "(" _ expression:Expression _ ")" {
    var loc = location()
    expression.parenthesesRange = [loc.start.offset, loc.end.offset]
    return expression;
  }
  / Literal
  / "this" {
      var loc = location()
      return {
        type: 'ThisExpression',
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / Identifier

Literal
  = NumericLiteral
  / StringLiteral
  / BooleanLiteral
  / NullLiteral
  / ObjectLiteral
  / ArrayLiteral

NumericLiteral "number"
  = literal:HexIntegerLiteral !(IdentifierStart / DecimalDigit) {
      return literal;
    }
  / literal:BinaryIntegerLiteral !(IdentifierStart / DecimalDigit) {
      return literal;
    }
  / literal:OctalIntegerLiteral !(IdentifierStart / DecimalDigit) {
      return literal;
    }
  / literal:DecimalLiteral !(IdentifierStart / DecimalDigit) {
      return literal;
    }
HexIntegerLiteral
  = "0x"i digits:$HexDigit+ {
      return buildNumericLiteral(parseInt(digits.split('_').join(''), 16));
    }
BinaryIntegerLiteral
  = "0b"i digits:$BinaryDigit+ {
      return buildNumericLiteral(parseInt(digits.split('_').join(''), 2));
    }
OctalIntegerLiteral
  = "0o"i digits:$OctalDigit+ {
      return buildNumericLiteral(parseInt(digits.split('_').join(''), 8));
    }
DecimalDigit
  = [0-9_]
NonZeroDigit
  = [1-9]
DecimalLiteral
  = DecimalIntegerLiteral "." DecimalDigit* ExponentPart? {
      return buildNumericLiteral(parseFloat(text().split('_').join('')));
    }
  / "." DecimalDigit+ ExponentPart? {
      return buildNumericLiteral(parseFloat(text().split('_').join('')));
    }
  / DecimalIntegerLiteral ExponentPart? {
      return buildNumericLiteral(parseFloat(text().split('_').join('')));
    }
HexDigit
  = [0-9a-f_]i
BinaryDigit
  = [0-1_]i
OctalDigit
  = [0-7_]i
DecimalIntegerLiteral
  = "0"
  / NonZeroDigit DecimalDigit*
ExponentPart
  = ExponentIndicator SignedInteger
ExponentIndicator
  = "e"i
SignedInteger
  = [+-]? DecimalDigit+
StringLiteral "string"
  = '"' chars:DoubleStringCharacter* '"' {
      var loc = location()
      return {
        type: 'StringLiteral',
        value: chars.join(""),
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / "'" chars:SingleStringCharacter* "'" {
      var loc = location()
      return {
        type: 'StringLiteral',
        value: chars.join(""),
        range: [loc.start.offset, loc.end.offset]
      };
    }

BooleanLiteral
  = "true"  {
    var loc = location()
    return {
      type: "BooleanLiteral",
      value: true,
      range: [loc.start.offset, loc.end.offset]
    };
  }
  / "false" {
    var loc = location()
    return {
      type: "BooleanLiteral",
      value: false,
      range: [loc.start.offset, loc.end.offset]
    };
  }

NullLiteral
  = "null"  {
    var loc = location()
    return {
      type: "NullLiteral",
      range: [loc.start.offset, loc.end.offset]
    };
  }

ObjectLiteral
  = "{" _ "}" {
    var loc = location()
    return {
      type: "ObjectExpression",
      properties: [],
      range: [loc.start.offset, loc.end.offset]
    };
  }
  / "{" _ properties:PropertyNameAndValueList _ "}" {
    var loc = location()
    return {
      type: "ObjectExpression",
      properties: properties,
      range: [loc.start.offset, loc.end.offset]
    };
  }
  / "{" _ properties:PropertyNameAndValueList _ "," _ "}" {
    var loc = location()
    return {
      type: "ObjectExpression",
      properties: properties,
      range: [loc.start.offset, loc.end.offset]
    };
  }

ArrayLiteral
  = "[" _ "]" {
      var loc = location()
      return {
        type: "ArrayExpression",
        elements: [],
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / "[" _ elements:ElementList _ "]" {
      var loc = location()
      return {
        type: "ArrayExpression",
        elements: elements,
        range: [loc.start.offset, loc.end.offset]
      };
    }

ElementList
  = head:(
      elision:(Elision _)? element:Expression {
        return optionalList(extractOptional(elision, 0)).concat(element);
      }
    )
    tail:(
      _ "," _ elision:(Elision _)? element:Expression {
        return optionalList(extractOptional(elision, 0)).concat(element);
      }
    )*
    { return Array.prototype.concat.apply(head, tail); }

Elision
  = "," commas:(_ ",")* { return filledArray(commas.length + 1, null); }

PropertyNameAndValueList
  = head:PropertyAssignment tail:(_ "," _ PropertyAssignment)* {
      return buildList(head, tail, 3);
    }

PropertyAssignment
  = key:PropertyName _ ":" _ value:Expression {
      var loc = location()
      return {
        type: "Property",
        key: key,
        value: value,
        shorthand: false,
        range: [loc.start.offset, loc.end.offset]
      };
    }
  / key:PropertyName {
      var loc = location()
      return {
        type: "Property",
        key: key,
        value: key,
        shorthand: true,
        range: [loc.start.offset, loc.end.offset]
      };
    }

PropertyName
  = Identifier
  / StringLiteral
  / NumericLiteral

PrefixUnaryOperator
  = "+"
  / "-"
  / "!"
  / "~"
  / "not"
  / "await"

DoubleStringCharacter
  = !('"') . { return text(); }

SingleStringCharacter
  = !("'") . { return text(); }

Identifier "identifier"
  = head:IdentifierStart tail:IdentifierPart* {
      var loc = location()
      return {
        type: 'Identifier',
        name: head + tail.join(""),
        range: [loc.start.offset, loc.end.offset]
      };
    }

IdentifierStart
  = [a-z]
  / [A-Z]
  / "$"
  / "_"

IdentifierPart
  = IdentifierStart
  / [0-9]

_ "whitespace"
  = [ \t\n\r]*
