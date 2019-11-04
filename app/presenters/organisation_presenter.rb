class OrganisationPresenter < BasePresenter
  COLUMNS = [
    { name: :name, field: :name, label: 'Название', align: 'left', sortable: true },
    { name: :form_of_ownership, field: :formOfOwnership, label: 'Тип', align: 'left', sortable: true },
    { name: :inn, field: :inn, label: 'ИНН', sortable: true },
    { name: :ogrn, field: :ogrn, label: 'ОГРН', sortable: true },
    { name: :actions, label: '', align: 'left', sortable: true }
  ]

  def columns
    COLUMNS
  end

  def columns_keys
    COLUMNS.map { |column| column[:name] }
  end

  def actions
    [
        { name: :edit, label: 'Edit', icon: 'fas fa-edit' },
        { name: :delete, label: 'Delete', icon: 'fas fa-trash' }
    ]
  end

  def meta
    {
        columns: columns,
        columns_keys: columns_keys,
        actions: actions
    }
  end
end