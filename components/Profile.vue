<template>
  <div class="overflow-hidden shadow my-4">
    <picture>
      <source
        media="(min-width: 1024px)"
        type="image/webp"
        srcset="
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=232&fm=webp,
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=464&fm=webp 2x
        "
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        srcset="
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=927&fm=webp,
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=1854&fm=webp 2x
        "
      />
      <source
        media="(min-width: 640px)"
        type="image/webp"
        srcset="
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=703&fm=webp,
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=1406&fm=webp 2x
        "
      />
      <source
        media="(max-width: 640px)"
        type="image/webp"
        srcset="
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=576&fm=webp,
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=1152&fm=webp 2x
        "
      />
      <img
        src="https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?w=927&ar=2:1&fit=crop"
        srcset="
          https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/aa323d803214427ebe8073dec08af277/profile_bg2.jpg?ar=2:1&fit=crop&fp-y=0.5&w=1854 2x
        "
        decoding="async"
        class="w-full"
        width="927"
        height="463.5"
      />
    </picture>
    <div class="flex justify-center -mt-8">
      <picture>
        <source
          type="image/webp"
          srcset="
            https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/56e3cc13d5f340d08aa6f5241b9ecfb9/profile.jpg?crop=faces&fit=crop&w=120&h=120&fm=webp,
            https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/56e3cc13d5f340d08aa6f5241b9ecfb9/profile.jpg?crop=faces&fit=crop&w=240&h=240&fm=webp 2x
          "
        />

        <img
          src="https://images.microcms-assets.io/assets/66b6ae18c90047bf84bb5455ae1e5899/56e3cc13d5f340d08aa6f5241b9ecfb9/profile.jpg?crop=faces&fit=crop&w=120&h=120"
          class="rounded-full border-solid border-white border-2 -mt-6"
          width="120"
          height="120"
        />
      </picture>
    </div>
    <div class="text-center px-3 pb-6 pt-2">
      <h3 class="text-black text-sm bold font-sans">なんしー</h3>
      <h4 class="mt-0.5 text-xs text-gray-500">ブロガー・プログラマー</h4>
      <p class="text-left mt-4 text-grey-dark">
        2021年に五島列島の福江島に移住した。<br />趣味はSUP、釣り、キャンプ。
      </p>
    </div>
  </div>
</template>
