<template>
    <div class="lang_select">
        <select v-model="language">
            <option v-for="(lang, index) in locales" :key="index" :value="lang.code">
                {{ lang.name }}
            </option>
        </select>
        
    </div>
</template>
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const language = computed({
    get: () => locale.value,
    set: (value) => {
        setLocale(value)
    }
})

</script>
<style scoped lang="scss">
.lang_select{
    select{
        background: transparent;
        outline: none;
        border: 0px solid transparent !important;
        text-align: right;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 150% */
        letter-spacing: -0.32px;
        box-shadow: none !important;
        cursor: pointer;
       
    }
}
</style>