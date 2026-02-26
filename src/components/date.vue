<script>

    export default{
        props: {
            date: {
                type: date,
                required: true
            },
            time: {
                type: time,
                required: true
            }
        }
    }

</script>

<template>

    <p>Ausgestellt am: {{ date }} - {{ time }}</p>

</template>

<style scoped>

    p {
        color: rgb(210, 209, 209)
    }

</style>