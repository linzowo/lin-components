export default {
  methods: {
    formatterCellval(row, column, cellValue, index) {
      if (!cellValue) {
        return '-'
      }
      return cellValue
    }
  }
}
