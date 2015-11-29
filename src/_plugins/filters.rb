module Jekyll
  module DecodeFilters

    # Takes the nested heirarchy of lessons
    # and creates one flat array with them
    def flatten_lessons(input)
      result = []
      input.each do |content|
        if content.data['date'] != nil then
          content.data['date'] = Date.parse(content.data['date'], '%d-%m-%Y')
        end
      end

      input
    end

    # Sort an array of objects in an order
    # Modified from the Jekyll source of sort
    #
    # input - the object array
    # property - property within each object to filter by
    # nils ('first' | 'last') - nils appear before or after non-nil values
    # ordering ('asc' | 'desc') - whether to order ascending or descending
    #
    # Returns the filtered array of objects
    def ordered_sort(input, property = nil, nils = "first", ordering = 'asc')
      if input.nil?
          raise ArgumentError.new("Cannot sort a null object.")
      end
      ordering = (ordering == 'asc') ? 1 : -1
      if property.nil?
        input.sort
      else
        case
        when nils == "first"
          order = - 1
        when nils == "last"
          order = + 1
        else
          raise ArgumentError.new("Invalid nils order: " +
            "'#{nils}' is not a valid nils order. It must be 'first' or 'last'.")
        end

        input.sort { |apple, orange|
          apple_property = item_property(apple, property)
          orange_property = item_property(orange, property)

          if !apple_property.nil? && orange_property.nil?
            - order
          elsif apple_property.nil? && !orange_property.nil?
            + order
          else
            (apple_property <=> orange_property) * -1
          end
        }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::DecodeFilters)
