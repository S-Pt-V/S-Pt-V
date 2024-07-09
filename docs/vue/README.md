## 选项式API

```js
<template>
    <button @click="increment"> Count is: {{ count }} </button>
</teplate>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            this.count++
        }
    },
    mounted() {
        console.log('The initial count is ${this.count}.')
    }
}
</script>
```

## 组合式API

```js
<template>
    <button @click="increment"> Count is: {{ count }} </button>
</teplate>

<script>
    import {ref, onMounted } from 'vue'
    const count = ref(0)
    function increment() {
        count.value++
    }
    onMounted(() => {
        console.log('The initial count is ${this.count}.')
    })
</script>
```