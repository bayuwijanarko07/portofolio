<template>
  <div class="pt-8 bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <div class="mx-auto min-h-screen max-w-screen-xl flex flex-col md:flex-row">
      <Sidebar class="md:shrink-0" />
      <main class="flex-1 px-4 md:px-0 md:mx-6">
        <SidebarHeader />
        <ElementsContainer>
          <slot />
        </ElementsContainer>
      </main>
    </div>
  </div>
</template>
