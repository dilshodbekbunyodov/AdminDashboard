<template>
    <b-row class="content-header">
        <b-col class="content-header-left" cols="12" md="12">
            <b-row class="breadcrumbs-top">
                <b-col cols="12">
                    <div class="breadcrumb-wrapper">
                        <b-breadcrumb>
                            <b-breadcrumb-item class="home__icon" to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" class="align-text-top feather feather-home">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </b-breadcrumb-item>

                          <template  v-if="$route.meta.breadcrumb || $route.meta.pageTitle">
                            <b-breadcrumb-item
                                    v-for="item in getRouteBreadcrumb"
                                    :key="item.text"
                                    :active="item.active"
                                    :to="genDynamicRoute(item.to)"
                            >
                                {{ item.text }}
                            </b-breadcrumb-item>
                          </template>
                        </b-breadcrumb>
                    </div>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    computed: {
        getRouteBreadcrumb() {
            return this.$route.meta.breadcrumb
        }
    },
    methods: {
        /* eslint-disable */
        genDynamicRoute(value) {
            if (!value) return value
            return value
                .split('/')
                .map((el) => {
                    if (el[0] === ':') {
                        const newEl = el.replace(':', '')
                        return this.$route.params[newEl]
                    } else return el
                })
                .join('/')
        },
        /* eslint-enable */
    },

}
</script>
<style>
.breadcrumb {
    align-items: center;
}

.content-header-left .breadcrumb-item:nth-child(2) {
    color: var(--primary);
}

.breadcrumb-wrapper .breadcrumb {
    margin-bottom: 0;
}

.breadcrumb:not([class*=breadcrumb-]) .breadcrumb-item + .breadcrumb-item:before {
    background-image: url(../../assets/images/arrow.svg) !important;
    background-repeat: no-repeat;
    background-position: center 8px;
    height: 16px;
    aspect-ratio: 1;
    margin-right: 10px !important;
}

.breadcrumb-item + .breadcrumb-item::before {
    float: left;
    content: " ";
    height: 10px;
    width: 10px;
}

.home__icon {
    color: var(--primary);
    margin-top: 1px
}
</style>
