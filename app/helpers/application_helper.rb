module ApplicationHelper

  def page_class
    ["#{controller_path.gsub('/', '_')}_#{action_name}",
      content_for(:page_class),
      if logged_in?
        "signed_in"
      else
        "signed_out"
      end
    ].reject(&:blank?).join(' ')
  end

  def full_title(page_title = '')
    base_title = "Chirp"
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end

  def page_css(file)
    content_for(:stylesheet, stylesheet_link_tag("_pages/#{file}"))
  end

  def page_js
    main = "#{controller_path.gsub('/', '_').gsub('_', '').capitalize}#{action_name.capitalize}"
    javascript_tag "if (typeof App.Pages.#{main} != 'undefined') App.Pages.#{main}();", type: 'text/javascript'
  end

end
