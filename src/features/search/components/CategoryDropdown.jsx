import * as Select from '@radix-ui/react-select';
import { categories } from '../data/categories';

// shadcn Select: adaptasi Radix Select untuk filter kategori.
export default function CategoryDropdown({ value, onChange }) {
  return (
    <Select.Root value={value || 'all'} onValueChange={(next) => onChange(next === 'all' ? '' : next)}>
      <Select.Trigger aria-label="Kategori" className="flex h-11 w-full items-center justify-between gap-2 rounded-md border border-green-200 bg-white px-3 text-sm text-green-950 focus-visible:outline-2 focus-visible:outline-green-500">
        <Select.Value />
        <Select.Icon asChild>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-green-700">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={6} className="z-50 min-w-[var(--radix-select-trigger-width)] rounded-xl border border-green-200 bg-white p-1.5 shadow-lg">
          <Select.Viewport>
            {['all', ...categories].map((category) => (
              <Select.Item key={category} value={category}
                className="flex cursor-default items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-green-950 outline-none data-highlighted:bg-green-50 data-[state=checked]:bg-green-100">
                <Select.ItemText>{category === 'all' ? 'Semua kategori' : category}</Select.ItemText>
                <Select.ItemIndicator asChild>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-green-700">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
