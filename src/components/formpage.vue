<template>
    <div>
        {{ active }}

        <el-form ref="form" :model="form" label-width="150px" :rules="rules">
            <el-form-item label="Enter Name" prop="name">
                <el-input clearable v-model="form.name" placeholder="enter name"></el-input>
            </el-form-item>

            <el-form-item label="Enter Employee id" prop="empid">
                <el-input v-model="form.empid" type="number" placeholder="enter employee id"></el-input>
            </el-form-item>

            <el-form-item label="Enter Age" prop="age">
                <el-input v-model="form.age" type="number" placeholder="enter"></el-input>
            </el-form-item>

            <el-form-item label="Date Of Join">
                <el-col>
                    <el-date-picker type="date" value-format="yyyy/MM/dd" placeholder="pick a date" v-model="form.date">
                    </el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="Select Gender">
                <el-select v-model="form.gender" type="string" placeholder="selecet gender">
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="female"></el-option>
                    <el-option label="Transgender" value="transgender"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Mobile Number" prop="mobileno">
                <el-input v-model="form.mobileno" placeholder="mobile number" type="number"></el-input>
            </el-form-item>

            <el-form-item label="Address">
                <el-input v-model="form.address" placeholder="address"></el-input>
            </el-form-item>

            <el-form-item label="Skill" prop="skill">

                <el-checkbox-group v-model="form.skill">
                    <el-checkbox label="Js "></el-checkbox>
                    <el-checkbox label="Python "></el-checkbox>
                    <el-checkbox label="Php "></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label='nativestate'>
                <el-select v-model="form.state">
                    <el-option v-for="item in nativeState" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item inline="true">

                <el-button type="primary" @click="cancel">cancel</el-button>

                <el-button type="success" @click="submitUpdateForm">{{ activeKey ? 'Submit' : 'Update' }}</el-button>

                <!-- <el-button type="success" @click="update('form')" v-else-if="isedit">update</el-button> -->

            </el-form-item>

        </el-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            nativeState: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
                'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
            ],

            tabledata: [],
            form: {
                name: '',
                age: '',
                empid: '',
                date: '',
                gender: '',
                mobileno: '',
                address: '',
                skill: [],
                state: ''
            },
            activeKey: this.$route.params.activeKey,
            index: this.$route.params.index,

            rules: {
                name: [{
                    required: true,
                    message: 'Requird name',
                    trigger: 'blur'
                }],
                age: [{
                    required: true,
                    pattern: '[0-9]{2}',
                    message: 'Required age',
                    trigger: 'blur'
                }],
                empid: [{
                    required: true,
                    message: 'Requird emp id',
                    trigger: 'blur'
                },],
                mobileno: [{

                    required: true,
                    message: 'Required mobile no',
                    trigger: 'blur'
                },
                {

                    min: 10,
                    max: 10,
                    message: 'only enter 10 numbers'
                }

                ]

            }

        }

    },
    mounted() {
        this.tabledata = JSON.parse(localStorage.getItem('tabledata')) || []
        if (!this.activeKey) {
            this.form = this.tabledata[this.index]
        }
    },

    methods: {
        submitUpdateForm() {
            if (this.activeKey) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let found = this.tabledata.find(item => item.empid === this.form.empid)
                        if (found) {
                            this.$message({
                                type: 'warning',
                                message: 'ALREADY EXIST'

                            })

                        } else {
                            this.tabledata.push(this.form)
                            this.savedata()
                            this.$router.push({
                                name: 'tablePage'
                            })

                        }

                    }
                })
            } else {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let index = this.tabledata.findIndex(item => item.empid === this.form.empid);

                        let found = this.tabledata.find((item, checkIndex) => item.empid === this.form.empid && checkIndex !== index);
                        if (found) {
                            this.$message({
                                type: 'warning',
                                message: 'ALREADY EXIST'

                            })
                        } else {
                            this.tabledata.splice(this.index, 1, this.form);
                            this.savedata(),
                                this.$router.push({
                                    name: 'tablePage',

                                })
                        }

                    }
                })
            }
        },
        savedata() {
            const parsed = JSON.stringify(this.tabledata)
            localStorage.setItem('tabledata', parsed)

        },
        cancel() {
            this.handleCancel()

        },
        handleCancel() {

            this.form = {
                name: '',
                age: '',
                empid: '',
                date1: '',
                gender: '',
                mobileno: '',
                address: '',
                skill: [],
                state: ''
            }
            this.$router.push({
                name: 'tablePage',

            })

            // router.push('/')
        }
    }
}
</script>

<style>
</style>