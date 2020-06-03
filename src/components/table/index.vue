<template>
  <div id="tableTemplate">
    <table>
      <thead>
        <tr>
          <th v-for="item in flied" v-bind:key="item">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in datas" v-bind:key="item[0]">
          <td>{{item[0]}}</td>
          <td>{{item[1]}}</td>
          <td>{{item[2]}}</td>
          <td>{{item[3]}}</td>
          <td>{{item[4]}}</td>
          <td>{{item[5]}}</td>
          <td>{{item[6]}}</td>
          <td>{{item[7]}}</td>
          <td>{{item[8]}}</td>
          <td>{{item[9]}}</td>
          <td>{{item[10]}}</td>
          <td>{{item[11]}}</td>
          <td>{{item[12]}}</td>
          <td>{{item[13]}}</td>
          <td>{{item[14]}}</td>
          <td>{{item[15]}}</td>
          <td>{{item[16]}}</td>
          <td>{{item[17]}}</td>
          <td>{{item[18]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: "Table",
  props: {
    flied: Array,
    datas: Array
  }
};
</script>

<style scoped lang="scss">
#tableTemplate {
  width: 100%;
  height: 500px;
  overflow: auto;
  border: 1px solid #6e6e6e;
  table {
    position: relative;
    border-spacing: 0;
    thead {
      tr {
        th {
          line-height: 1.2;
          background: #4fc2a1;
          position: sticky;
          top: 0;
          padding: 5px 10px;
          min-width: 100px;
          z-index: 1;
          color: #fff;
          font-weight: bold;
          vertical-align: middle;
        }
      }
    }
    tbody {
      tr {
        background: #fff;
        &:nth-of-type(even) {
          background: #334960;
          color: #fff;
        }
        td {
          padding: 5px;
          border: 1px solid #6e6e6e;
          &:nth-of-type(1) {
            font-weight: bold;
            position: sticky;
            left: -1px;
            color: #fff;
            background: #4fc2a1;
          }
          &:nth-of-type(2) {
            color: #fff;
            background: #4fc2a1;
            position: sticky;
            left: 118px;
          }
        }
      }
    }
  }
}
</style>
