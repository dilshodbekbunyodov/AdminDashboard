<template>
    <div class="tabs__">
        <b-tabs pills>
            <b-tab title="Продукты" lazy active>
                <Product/>
            </b-tab>
            <b-tab title="Тип" lazy>
                <TypeProduct/>
            </b-tab>
            <b-tab title="Единицы" lazy>
                <Units/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script setup>
import Product from "./Product/index.vue";
import TypeProduct from "./typeProduct/index.vue";
import Units from './units/index.vue'
</script>

<style>
.tabs__ .nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    background: var(--primary);
}

.dark .tabs__ .nav-link {
  color: #d0d2d6;
}

.tabs__ .nav-link {
    color: #5e5873;
}

.tabs__ .nav-link button {
  //width: 100%;
  //text-align: left;
}
</style>
