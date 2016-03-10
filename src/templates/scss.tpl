@mixin <%= prefix %>-sprites($x: 0, $y: 0, $width: 0, $height: 0) {\n
    background-position: $x $y;\n
    width: $width;\n
    height: $height;\n
}\n
\n
.<%= prefix %> {\n
    background-image: url(<%= backgroundImage %>);
    background-repeat: no-repeat;\n
    display: block;\n
}\n

<% $.map(sprites, function (sprite) { %>
\n
    $<%= prefix %>-<%= sprite.name %>-left: sprite.left(true);
    $<%= prefix %>-<%= sprite.name %>-top: sprite.top(true);
    .<%= prefix %>.<%= prefix %>-<%= sprite.name %> {\n
        @include <%= prefix %>-sprites($<%= prefix %>-<%= sprite.name %>-left, $<%= prefix %>-<%= sprite.name %>-top, <%= sprite.image.width %>px, <%= sprite.image.height %>px);\n
    }\n
<% }); %>
