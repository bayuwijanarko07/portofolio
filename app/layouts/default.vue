<template>
  <div class="pt-8 bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <div class="mx-auto flex min-h-screen max-w-screen-xl">
      <Sidebar />
      <main class="flex-1 md:mx-6">
        <SidebarHeader />
        <ElementsContainer>
          <slot />
        </ElementsContainer>
      </main>
    </div>
  </div>
</template>
