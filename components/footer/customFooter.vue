<template>
    <div class="footer_container">
        <p>{{$t('footer.description')}}</p>
        <div class="flex_row gap_16">
            <a href="https://www.tiktok.com/@elise.codes"><icon name="TiktokLogo" size="24"/></a>
            <a><icon name="GithubLogo" size="24"/></a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer_container{
    display:flex;
    justify-content: space-between;
    padding:40px;
}
</style>