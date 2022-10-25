// 函数式组件
// export default () => <div>TestTsx</div>;

import { ElButton } from "element-plus";
import { defineComponent, watch, ref, computed, reactive } from "vue";
import styles from "./TestTsx.module.css";

// defineComponent() render Options API
// export default defineComponent({
// 其他配置
// 需要与 this 打交道
//   render() {
//     return <div>TestTsx</div>;
//   },
// });

// 定义组件 Child
const Child = defineComponent({
  name: "childCom",
  props: {
    childrenName: {
      type: String,
      require: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <>
        默认插槽:{slots.default?.()}
        <br />
        具名插槽:{slots.prefix && slots.prefix()}
        <br />
        作用域插槽:{slots.suffix && slots.suffix({ name: "suffix" })}
      </>
    );
  },
});
// 父子传值 emit
const son = defineComponent({
  name: "sonCom",
  emits: ["transValue"],
  setup(props, { emit }) {
    return () => (
      <div>
        <button onClick={() => emit("transValue", "emit 传值")}>
          emit传值
        </button>
      </div>
    );
  },
});
// defineComponent() setup composition API
export default defineComponent({
  // 其他配置
  name: "TestTsx",
  setup() {
    // const url = document.querySelector('div');
    const counter = ref(0);
    const note = reactive({ name: "wang" });
    const doubleCounter = computed(() => counter.value * 2);
    const condition = ref(true);
    const list = ref<string[]>(["abc", "cba"]);
    const modelValue = ref<string>("rua");
    const logData = (value: string) => console.log(value);
    // # watch 的第一个参数可以是不同形式的“数据源”，它可以是：

    // # 一个 ref
    // # 一个计算属性
    // # 一个 getter 函数（有返回值的函数）
    // # 一个响应式对象
    // # 以上类型的值组成的数组
    // mark: 监听单个 ref
    watch(counter, (newValue, oldValue) => {
      console.log(`counter is ${newValue},old counter is ${oldValue}`);
    });
    // mark: 监听计算属性
    watch(doubleCounter, (newValue) => {
      console.log(`doubleCounter is ${newValue}`);
    });
    // mark: 监听一个 getter 函数
    watch(
      () => note.name,
      (name, prevName) => {
        console.log(`name is ${name},prevName is ${prevName}`);
      }
    );
    // 返回 jsx
    return () => (
      <div>
        <div class={styles.baseFrame}>TestTsx</div>
        <br />
        <input type="text" v-model={note.name} />
        <br />
        <input type="text" v-model={counter.value} />
        <br />
        {/* v-if */}
        <div>{condition.value ? <span>yes</span> : <span>no</span>}</div>
        <br />
        {/* v-for */}
        <div>
          {list.value.map((data, index) => (
            <p class={styles.baseColor} key={index}>
              {data}
            </p>
          ))}
        </div>
        <br />
        {/*
          插槽 v-slot两种方法:
          1. 标签内写
        */}
        <Child
          v-slots={{
            prefix: () => <i class={styles.child}>prefix</i>,
            suffix: (props: Record<"name", string>) => (
              <span>{props.name}</span>
            ),
          }}
        >
          默认插槽内容
        </Child>
        <br />
        {/* 使用elementUIPlus组件 */}
        <ElButton>点我点我</ElButton>
        <br />
        {/* v-model 正常写法 */}
        <input type="text" v-model={modelValue.value} />
        <br />
        {/* v-model 指定绑定值写法 */}
        <input type="text" v-model={[modelValue.value, "modelValue"]} />
        <br />
        {/* v-model 修饰符写法 */}
        <input
          type="text"
          v-model={[modelValue.value, "modelValue", ["trim"]]}
        />
        <br />
        {/* 学习父子传值的方法 */}
        {/* 第一种方法 */}
        <son onTransValue={logData}></son>
        <br />
        {/* 第二种方法 解构赋值 */}
        <son {...{ onTransValue: logData }}></son>
        <br />
      </div>
    );
  },
});
