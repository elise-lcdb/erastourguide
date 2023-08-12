<template>
    <div class="flex_column gap_24">
        <h1 class="page_title">{{ $t('chants.title') }}</h1>
        <div>
            <chants-carousel :chants="chants"/>
        </div>

    </div>
</template>
<script setup lang="ts">


const chants = [
    {chant: "\"1,2,3 Let's go bitch!\"", spotifyId: '6NFyWDv5CjfwuzoCkw47Xf', tiktokId:  '7221935312862399790'},
    {chant: "\"You forgive, you forget, but you never let it go\"", spotifyId: '0TvQLMecTE8utzoNmvXRbK', tiktokId:  '7226137627441777963'},
    {chant: "\"Where are you going Taylor?\"", spotifyId: '3qoftcUZaUOncvIYjFSPdE', tiktokId:  '7230964119371926826'},
    {chant: "*Clap Clap*", spotifyId: '1qrpoAMXodY6895hGKoUpA', tiktokId:  '7233176111180418346'},
    {chant: "\"What time is it Taylor?\"", spotifyId: '0ug5NqcwcFR2xrfTkc7k8e', tiktokId:  '7227335958327332138'},
    {chant: "\"Taylor, you'll be fine\"", spotifyId: '0V3wPSX9ygBnCm8psDIegu', tiktokId:  '7240919022072597803'},
]
useHead({
    script: [
        {
          src: "https://www.tiktok.com/embed.js"
        }
      ]
})
</script>
