<template>

    <div>
        <div align="center">
            <h1>EMPLOYEE DETAILS</h1>
        </div>
        <div align="right">
            <el-button type="success" @click="add">ADD</el-button>
        </div>

        <el-table :data="tabledata" style="width:100%" border id="space">
            <el-table-column prop="name" align="center" label="Name" width="160px">
            </el-table-column>
            <el-table-column prop="empid" align="center" label="Emp id" width="150">
            </el-table-column>
            <el-table-column prop="age" align="center" label="Age" width="150">
            </el-table-column>
            <el-table-column prop="date" align="center" label="Date" width="180">
            </el-table-column>
            <el-table-column prop="gender" align="center" label="Gender" width="150">
            </el-table-column>
            <el-table-column prop="mobileno" align="center" label="Mobileno" width="150">
            </el-table-column>
            <el-table-column prop="address" align="center" label="Address" width="400">
            </el-table-column>
            <el-table-column prop="skill" label="Skill" width="200"><template slot-scope="scope">{{
                    scope.row.skill.toString()
            }}</template>
            </el-table-column>
            <el-table-column prop="state" label="State" width="">
            </el-table-column>
            <el-table-column width="" label="More">
                <template slot-scope="scope">
                    <el-button @click="delete1(scope.$index, tabledata)" type="text" size="small">
                        <i class="el-icon-delete"></i>

                    </el-button>
                    <el-button @click="edit(scope.$index, tabledata)" type="text" size="small">
                        <i class="el-icon-edit"></i>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
import router from '@/router';


export default {
    name: 'formchild',

    data() {
        return {
            isconform: true,
            tabledata: [],


        }
    },
    mounted() {

        if (localStorage.getItem('tabledata')) {
            this.tabledata = JSON.parse(localStorage.getItem('tabledata')) || []

        }
    },
    methods: {
        add() {
            router.push({
                name: 'formpage',
                params: {
                    activeKey: this.isconform
                }
            })
        },
        delete1(index) {
            this.$confirm('are you sure your data will be delete?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'warning',
                    message: 'Delete completed'

                })
                this.localstoragedelete(index)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        localstoragedelete(index) {
            this.tabledata.splice(index, 1)
            const parsed = JSON.stringify(this.tabledata)
            localStorage.setItem('tabledata', parsed)

        },
        edit(index) {
            this.objcopy = Object.assign({}, this.tabledata[index])
            router.push({
                name: 'formpage',
                params: {
                    index: index,
                    activeKey: false

                }
            })

        },

    }
}
</script>

<style>
#space {

    margin-top: 50px;
}
</style>
