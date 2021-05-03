<template>
    <div id="longLine">
        長線選股
        <SlickList lockAxis="y" v-model="items" tag="ul" @input="sort">
            <SlickItem v-for="(item, index) in items" :index="index" :key="index" tag="li">
                <input type="checkbox" :value="item"/>{{ item }}
            </SlickItem>
      </SlickList>
    </div>
</template>

<style>
    #longLine{
        color:red;
    }
</style>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
    name: "Self",
    mounted: function () {},
    components: {
        SlickItem,
        SlickList,
    },
    data() {
        return {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
        };
    },
    methods: {
        sort(element){
            console.log(element)
        }
    }
};
</script>
