<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Post</h4>
                        <hr>

                         <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">TITLE</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">CONTENT</label>
                                <textarea class="form-control" rows="4" v-model="post.content" placeholder="Masukkan Konten Post"></textarea>
                                <!-- validation -->
                                <div v-if="validation.content" class="mt-2 alert alert-danger">
                                    {{ validation.content[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'

    export default {
        setup() {
            // state posts
            const post = reactive({
                title: '',
                content: ''
            })

            // state validation
            const validation = ref([])

            // vue router
            const router = useRouter()

            // vue router
            const route = useRoute()

            // Mounted
            onMounted(() => {
                // get api from laravel backend buat edit
                axios.get(`http://lara8_api.test/api/post/${route.params.id}'`)
                .then(response => {

                    // assign  post state with response data
                    post.title = response.data.data.title
                    post.content = response.data.data.content
                }).catch(error => {
                    console.log(error.response.data)
                })
            })


            // make update function
            function update() {
                let title = post.title
                let content = post.content

                axios.put(`http://lara8_api.test/api/post/${route.params.id}`, {
                    title: title,
                    content: content
                }).then(() => {
                    // if success redirect to post index
                    router.push({
                        name: 'post.index'
                    })
                }).catch(error => {
                    //assign state with validation message
                    validation.value = error.response.data
                })
            }

            return {
                post,
                validation,
                router,
                update
            }
        }        
    }
</script>