<template>
  <div class="l-container">
    <Header />
    <div class="mt-8 post_content">
      <h2 class="is-style-section_ttl font-bold">ブログ新着</h2>
      <PostList />
    </div>
    <div class="mt-8 px-4">
      <Profile />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post_content .is-style-section_ttl {
  position: relative;
  padding-bottom: 0.75em;
  letter-spacing: 0.2px;
  text-align: center;
}

.post_content h2.is-style-section_ttl::after {
  position: absolute;
  top: auto;
  bottom: 0;
  left: calc(50% - 1.25em);
  right: auto;
  display: block;
  width: 2.5em;
  height: 1px;
  border-radius: 2px;
  pointer-events: none;
  background: currentColor;
  content: '';
}
</style>
