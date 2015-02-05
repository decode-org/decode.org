# Title: CodePen plugin for Jekyll/Octopress
# Author: Volker Rose (@riddla | http://volker-rose.de/ | volker.rose@gmail.com)
# Info: http://volker-rose.de/blog/2012/11/03/octopress-codepen-plugin/
# Credits: "Heavily inspired" (e.g. shamelessly copied) from the jsFiddle tag/plugin for Jekyll by Brian Arnold (@brianarn)
# Description: Given a CodePen shortcode, outputs the CodePen embed code e.g. the iframe.
#
# Syntax: {% codepen href user [type] [height] %}
#
# Examples:
#
# Input: {% codepen vhfon riddla %}
# Output: <pre class="codepen" data-height="300" data-type="result" data-href="vhfon" data-user="riddla"><code></code></pre>
#         <script async src="http://codepen.io:/assets/embed/ei.js"></script>
#
# Input: {% codepen vhfon riddla css 600 %}
# Output: <pre class="codepen" data-height="600" data-type="css" data-href="vhfon" data-user="riddla"><code></code></pre>
#         <script async src="http://codepen.io:/assets/embed/ei.js"></script>

module Jekyll
  class CodePen < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      if /(?<pen>\w+)\s?(?:(?<extra>.+))?/ =~ markup
        @pen    = pen
        @tags   = extra || ''
      end

      @attributes = {
        :user => 'decode',
        :type => 'result',
        :height => '300'
      }

      if @tags
        @tags.scan(Liquid::TagAttributes) do |key, value|
          @attributes[key.to_sym] = value
        end
      end

      puts @attributes['type']
    end

    def render(context)
      if @pen
        "<p><div data-height=\"#{@attributes[:height]}\" data-theme-id=\"12039\" data-slug-hash=\"#{@pen}\" data-default-tab=\"#{@attributes[:type]}\" data-user=\"#{@attributes[:user]}\" class=\"codepen\"><pre><code> </code></pre><p>See the Pen <a href=\"http://codepen.io/decode/pen/#{@pen}/\">#{@pen}</a> by <a href=\"http://codepen.io/#{@attributes[:user]}\">@#{@attributes[:user]}</a> on <a href=\"http://codepen.io\">CodePen</a>.</p></div><script async=\"async\" src=\"//assets.codepen.io/assets/embed/ei.js\"> </script></p>"
      else
        "Error processing input"
      end
    end
  end
end

Liquid::Template.register_tag('codepen', Jekyll::CodePen)
