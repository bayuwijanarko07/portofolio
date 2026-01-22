<template>
  <div class="min-h-screen xl:flex bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <div class="flex-1 xl:ml-[290px]">
    <Sidebar/>
      <main class="mx-auto">
        <SidebarHeader />
        <div class="mx-auto max-w-(--breakpoint-2xl) p-6 pb-20 md:p-8 md:pb-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
