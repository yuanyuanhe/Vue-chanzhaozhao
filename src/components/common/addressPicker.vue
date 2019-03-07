<template>
  <div @click="showMutiPicker" class="add-address-info-text">{{address}}</div>
</template>

<script>
  import api from '../../units/config'
  export default {
    name: "addressPicker",
    props:{
      region:{
        type: Array,
        default: () => []
      },
      regionId:{
        type: Array,
        default: () => []
      }
    },
    data(){
      return{
        provinceList: [],       //省列表
        provinceIndex:0,       //省位置索引
        cityList: [],           //市列表
        cityIndex: 0,          //市位置索引
        areaList: [],           //区列表
        areaIndex: 0,          //区位置索引
        address:'',           //所在地址
        isEdit: false,        //父组件是否传递省市区
      }
    },
    methods: {
      /**
       * 拉起地址选择器，此处参考cube-ui框架
       */
      showMutiPicker() {
        this.getProvince();
        const self = this;
        if (!this.mutiPicker) {
          this.mutiPicker = this.$createPicker({
            title: '',
            data: [this.provinceList, this.cityList, this.areaList],
            swipeTime: 1000,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle,
            onChange: this.changeScroll,
          })
        }
        this.mutiPicker.show()
      },
      /**
       * 地址picker确认的操作
       */
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.$emit('getArea',selectedVal)
        this.address = selectedText.join(' ');
      },
      /**
       * 地址picker取消的操作
       */
      cancelHandle() {

      },
      changeScroll(index, selectedIndex) {
        const self = this;
        switch (index) {
          case 0:
            this.provinceList.forEach((item, index)=>{
              if(selectedIndex==index){
                let id = item['value'];
                self.provinceIndex = index;
                self.cityIndex = 0;
                self.areaIndex = 0;
                self.getCity(id)
              }
            })
            break;
          case 1:
            this.cityList.forEach((item, index)=>{
              if(selectedIndex==index){
                let id = item['value'];
                self.cityIndex = index;
                self.areaIndex = 0;
                self.getArea(id)
              }
            })
            break;
        }
      },
      /**
       * 省列表
       */
      getProvince(){
        const self = this;
        self.httpAjax({
          method: api.vip.province,
          data:{
            "access_token":'c473627a5f6a43e49d9eaee00c42e1fd'
          }
        }).then(res=>{
          let provinceList = res.prv_list;
          if(provinceList[0]['prv_num_id']==0){
            provinceList.splice(0,1);
          }
          let newProvinceList = [];
          provinceList.map(value=>{
            let obj = {};
            obj['text']=value.prv_name;
            obj['value']=value.prv_num_id;
            newProvinceList.push(obj)
          })
          self.provinceList = newProvinceList;
          self.getCity(self.provinceList[0]['value'])
        },res=>{
          console.log(res);
        })
      },
      /**
       * 根据省获得市列表数据
       */
      getCity(id){
        const self = this;
        self.httpAjax({
          method: api.vip.city,
          data:{
            "prv_num_id": id,
            "access_token":'c473627a5f6a43e49d9eaee00c42e1fd'
          }
        }).then(res=>{
          let cityList = res.city_list;
          let newCityList = [];
          cityList.map(value=>{
            let obj = {};
            obj['text']=value.city_name;
            obj['value']=value.city_num_id;
            newCityList.push(obj)
          })
          self.cityList = newCityList;
          self.getArea(self.cityList[0]['value'])
          self.mutiPicker.setData([self.provinceList, self.cityList, []],[self.provinceIndex,self.cityIndex,self.areaIndex])
        },res=>{
          console.log(res);
        })
      },
      /**
       * 根据市获得区列表数据
       * @param id
       */
      getArea(id){
        const self = this;
        self.httpAjax({
          method: api.vip.cityarea,
          data:{
            "city_num_id": id,
            "access_token":'c473627a5f6a43e49d9eaee00c42e1fd'
          }
        }).then(res=>{
          let areaList = res.city_area_list;
          let newAreaList = [];
          areaList.map(value=>{
            let obj = {};
            obj['text']=value.city_area_name;
            obj['value']=value.city_area_num_id;
            newAreaList.push(obj)
          })
          self.areaList = newAreaList;
          self.mutiPicker.setData([self.provinceList, self.cityList, self.areaList],[self.provinceIndex,self.cityIndex,self.areaIndex])
          self.isEdit = false;
        },res=>{
          console.log(res);
        })
      },
    },
    created(){

    },
    watch:{
      region(newValue){
        this.isEdit = true;
        this.address = newValue.join(' ');
        // if(newValue.length){
        //   var privinceIndex = 0,
        //     cityIndex = 0,
        //     areaIndex = 0;
        //   self.provinceList.forEach((item,index)=>{
        //     console.log(item['value'] == self.regionId[0]);
        //     if(item['value']==self.regionId[0]){
        //       privinceIndex = index;
        //     }
        //   })
        //   // self.cityList.forEach((item,index)=>{
        //   //   if(item['value']==self.regionId[1]){
        //   //     cityIndex = index;
        //   //   }
        //   // })
        //   // self.areaList.forEach((item,index)=>{
        //   //   if(item['value']==self.regionId[2]){
        //   //     areaIndex = index;
        //   //   }
        //   // })
        //   console.log(privinceIndex+'bbbb');
        // }
      },
      areaList(newValue){
        if(newValue.length&&this.isEdit){

        }
      }
    }
  }
</script>

<style scoped>

</style>
