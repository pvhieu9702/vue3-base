import { DEFAULT_PER_PAGE } from "@/libs/constants/common";
import { ref, watch } from "vue";

const firstPage = 1
export function table({ fetchData, initFilter }) {
  const currentPage = ref(firstPage)
  const perPage = ref(DEFAULT_PER_PAGE)
  const filter = ref(initFilter || {})
  const data = ref([])
  const totalItems = ref(0)
  const isFetching = ref(false)

  const getTableData = async () => {
    isFetching.value = true
    const rsl = await fetchData({
      ...filter.value,
      page: currentPage.value,
      per_page: perPage.value
    })
    data.value = rsl.data
    totalItems.value = rsl.total
    isFetching.value = false
  }

  const handlePageChange = async (newPage: number) => {
    currentPage.value = newPage
  }

  const handlePerPageChange = (newPerPage: number) => {
    perPage.value = newPerPage
  }

  const handleFilterChange = (newFilter) => {
    filter.value = newFilter
    currentPage.value = firstPage
  }
  const refetch = async () => {
    await getTableData()
  }

  watch([currentPage, perPage, filter], async () => {
    await getTableData()
  }, { immediate: true })

  return {
    currentPage,
    perPage,
    data,
    totalItems,
    isFetching,
    handlePageChange,
    handlePerPageChange,
    handleFilterChange,
    refetch
  }
}
