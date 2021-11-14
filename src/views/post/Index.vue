<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Post</h4>
                        <hr>
                        <router-link :to="{name: 'post.create'}" class="btn btn-primary">Tambah Data</router-link>
                        
                        <table class="table table-striped table-bordered mt-5">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>{{post.title}}</td>
                                    <td>{{post.content}}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'post.edit', params:{id: post.id}}" class="btn btn-sm btn-warning">Edit</router-link>
                                        <button @click.prevent="postDelete(post.id)" class="btn btn-danger btn-sm mx-2">Delete</button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//untuk ambil data dari api laravel8
import axios from 'axios'
import { onMounted, ref} from 'vue'

    export default {
        setup() {
            
            // reactive state
            let posts = ref([])
            
            //mounted / memasang
            onMounted(() => {
                // ambil api dari laravel backend api
                axios.get('http://lara8_api.test/api/post')
                .then(response => {

                    // masukan data dan respose data
                    posts.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            // methode delete masih bermasalah
            function postDelete(id) {
                // delete post data by id
                axios.delete(`http://lara8_api.test/api/post/${id}`)
                .then(() => {
                    // if success splice posts
                    const index = this.post.findIndex(post => post.id === id)
                    if (~ index) {
                        this.post.splice(index, 1)
                    }
                }).catch(error => {
                    console.log(error.response.data)
                })
            }

         return {
            posts,
            postDelete
         }      

        }

     }
</script>
