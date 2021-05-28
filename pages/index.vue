<template>
  <div class="l-container">
    <header
      class="
        h-16
        sticky
        top-0
        z-10
        flex flex-wrap
        justify-center
        content-center
      "
      style="background-color: #0367a6"
    >
      <h1 class="text-white">五島ブログ</h1>
    </header>
    <div class="mt-8 post_content">
      <h2 class="is-style-section_ttl font-bold">ブログ新着</h2>
      <PostList />
    </div>
    <div class="mt-8 px-4">
      <div class="overflow-hidden shadow my-3">
        <img
          src="https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?w=400&ar=2:1&fit=crop"
          class="w-full"
        />
        <div class="flex justify-center -mt-8">
          <img
            src="https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/56e3cc13d5f340d08aa6f5241b9ecfb9/profile.jpg?crop=faces&fit=crop&w=120&h=120"
            class="rounded-full border-solid border-white border-2 -mt-6"
          />
        </div>
        <div class="text-center px-3 pb-6 pt-2">
          <h3 class="text-black text-sm bold font-sans">なんしー</h3>
          <h4 class="mt-0.5 text-xs text-gray-500">ブロガー・プログラマー</h4>
          <p class="text-left mt-4 text-grey-dark">
            2021年に五島列島の福江島に移住した。<br />趣味はキャンプと釣り。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post_content .is-style-section_ttl {
  position: relative;
  padding: 0;
  padding-bottom: 0;
  padding-bottom: 0.75em;
  color: inherit;
  letter-spacing: 0.2px;
  text-align: center;
  background: 0 0;
  border: none;
  border-radius: 0;
}

.post_content h2.is-style-section_ttl {
  padding-bottom: 0.75em;
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
