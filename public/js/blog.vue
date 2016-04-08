<template>
    
    <div class="row">
        <h1>{{title}}</h1>
        <p>{{{content}}}</p>
    </div>
    
</template>

<script>



//Vue.component('my-component',{
//    template:'.myTemplate'
//});



export default {

    props:['title','content']

    //data: function() {
    //    return {
    //    msg: 'Hello from vue-loader'
    //    }
    //}
}

</script>

