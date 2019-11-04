class FindOrganisations
  attr_accessor :initial_scope #, :pagination, :filter

  def initialize(initial_scope, params)
    @initial_scope = initial_scope
    @params = params
    @pagination = {}
    @filter = ""
  end

  def call(params)
    scoped = initial_scope
    scoped = search(initial_scope)
    scoped = sort(scoped)
    scoped = paginate(scoped)
    scoped
  end

  def meta
    { pagination: @pagination, filter: @filter }
  end

  private

  def search(scoped)
    @filter = @params[:filter] || ""
    @filter.present? ? scoped.search(@filter) : scoped
  end

  def sort(scoped)
    @pagination[:sort_By] = @params[:sortBy] || :name
    @pagination[:descending] = (@params[:descending].to_s.downcase == "true").to_s
    scoped.order(@pagination[:sort_By] => (@pagination[:descending] == "true" ? :desc : :asc))
  end

  def paginate(scoped) #, page_number, rowsPerPage
    @pagination[:rowsNumber] = scoped.count
    @pagination[:page] = @params[:page] || 1
    @pagination[:rowsPerPage] = @params[:rowsPerPage] || 5
    scoped.page(@pagination[:page]).per(@pagination[:rowsPerPage])
  end
end