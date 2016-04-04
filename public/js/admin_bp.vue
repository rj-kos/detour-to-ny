<template>
    <div class="container">
        <div class="row">
            <h1>blog posts</h1>
        </div>
        <textarea class="editable"></textarea>
    </div>

    
    
</template>

<script>

var MediumEditor = require('medium-editor-webpack');

export default {

    ready () {
        var editor = new MediumEditor('.editable');
    }
   
}

</script>

