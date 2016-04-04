<template>
    <div class="container">
        <div class="row">
            <h1>gallery</h1>
        </div>
        <form action="/api/image_upload" class="dropzone" id="my-awesome-dropzone">
        </form>
    </div> 
    
    
</template>

<script>


export default {

    ready () {
        this.$parent.$options.methods.makeDZ('dropzone');
    }

    //props:['title','content']

    //data: function() {
    //    return {
    //    msg: 'Hello from vue-loader'
    //    }
    //}
}

</script>

