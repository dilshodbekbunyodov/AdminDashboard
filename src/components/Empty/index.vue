<template>
  <section class="code-box-demo">
    <div class="ant-empty">
      <div class="ant-empty-image">
          <svg class="ant-empty-img-simple" width="64" height="41" viewBox="0 0 64 41"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse class="ant-empty-img-simple-ellipse" fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse><g class="ant-empty-img-simple-g" fill-rule="nonzero" stroke="#D9D9D9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA" class="ant-empty-img-simple-path"></path></g></g></svg>
      </div>
      <p class="ant-empty-description">Нет данных</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
};
</script>

<style>
.code-box, .code-box .code-box-demo {
    background-color: #fff;
}

.code-box-demo {
    padding: 42px 24px 50px;
    color: #000000d9;
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
}

.ant-empty {
    margin: 0 8px;
    font-size: 14px;
    line-height: 1.5715;
    text-align: center;
}

.ant-empty-image {
    height: 100px;
    margin-bottom: 8px;
}

.ant-empty-image svg {
    height: 100%;
    margin: auto;
}
</style>
