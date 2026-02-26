<script setup>

import JobDescription from '../components/description.vue'
import Address from '../components/address.vue'
import Date from '@/components/date.vue'

</script>

<template>
    <div id="box">
        <div id="description">
            <JobDescription jobtitle="Lorem Ipsum" description="Soem sugus", requirements="Sugus" offer="Pizza"/>
            <Date id="date" date="2342-12-12" time="19:00"/> 
        </div>        
        <div id="address">
            <Address location-icon="src/images/place-marker-icon.jpg", location="Visp" postal-code=3911 canton="VS" building-icon="src/images/building-icon.jpg" company-name="Informatik AG" ></Address>
        </div>
    </div>
</template>

<style scoped>
    #box{
        display:flex;
        justify-content: space-between;
        flex-direction: row;
        background-color: #f6f5f4;
        padding-inline-start: 1%;
        margin-inline: 5%;
        border-radius: 30px;
    }
    #description{
        display: flex;
        flex-direction: column;
    }
    #address{
        padding-right: 3%;
        padding-top: 1px;
    }
    #date {
        margin-top: 25px;
    }
</style>


