<template>
  <div>
    <Header />

    <div class="max-w-screen-xl mx-auto lg:flex lg:flex-wrap justify-between">
      <main class="main lg:flex-1 lg:order-1">
        <PostList />
      </main>
      <aside class="lg:w-1/3 xl:w-1/4 sidebar lg:flex-initial lg:order-2">
        <Profile class="mt-8 mx-auto p-4 md:mx-4 lg:mx-6" />
      </aside>
    </div>
  </div>
</template>
