<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const UCheckbox = resolveComponent('UCheckbox')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const UAvatar = resolveComponent('UAvatar')

interface User {
  id: number
  name: string
  position: string
  email: string
  role: string
}

const toast = useToast()
const data = ref<User[]>([
  { id: 1, name: 'Lindsay Walton', position: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { id: 2, name: 'Courtney Henry', position: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { id: 3, name: 'Tom Cook', position: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
  { id: 4, name: 'Whitney Francis', position: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { id: 5, name: 'Leonard Krasner', position: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { id: 6, name: 'Floyd Miles', position: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' }
])

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      })
  },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { id: 'action' }
]

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user ID',
        icon: 'heroicons-outline:document-duplicate',
        onSelect: () => {
          navigator.clipboard.writeText(user.id.toString())
          toast.add({ title: 'User ID copied!', color: 'success', icon: 'heroicons-outline:check-circle' });
        }
      }
    ],
    [
    { label: 'Edit', icon: 'heroicons-outline:pencil' },
    { label: 'Delete', icon: 'heroicons-outline:trash', color: 'error' }

    ]
  ]
}

const globalFilter = ref('')
const pagination = ref({ pageIndex: 0, pageSize: 5 })
const rowSelection = ref<Record<string, boolean>>({})
</script>

<template>
  <div class="flex flex-col flex-1 w-full space-y-4">
    <div class="flex px-4 py-3.5 border-b border-(--ui-border-accented)">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Search..." />
    </div>

    <UTable v-model:row-selection="rowSelection" v-model:global-filter="globalFilter" v-model:pagination="pagination"
      :data="data" :columns="columns" :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }">
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg" />
          <div>
            <p class="font-medium text-(--ui-text-highlighted)">{{ row.original.name }}</p>
            <p>{{ row.original.position }}</p>
          </div>
        </div>
      </template>
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton icon="heroicons-outline:ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </template>
    </UTable>

    <div class="px-4 py-3.5 border-t border-(--ui-border-accented) text-sm text-(--ui-text-muted)">
      {{ rowSelection ? Object.keys(rowSelection).length : 0 }} selected.
    </div>

    <div class="flex justify-center border-t border-(--ui-border) pt-4">
      <UPagination :default-page="pagination.pageIndex + 1" :items-per-page="pagination.pageSize" :total="data.length"
        @update:page="() => (pagination.pageIndex = - 1)" />
    </div>
  </div>
</template>
