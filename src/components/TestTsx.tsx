// 函数式组件
// export default () => <div>TestTsx</div>;

import { ElButton } from "element-plus";
import { defineComponent } from "vue";
import { ref } from "vue";
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
  setup(props, { slots }) {
    return () => (
      <>
        默认插槽:{slots.default && slots.default()}
        <br />
        具名插槽:{slots.prefix && slots.prefix()}
        <br />
        作用域插槽:{slots.suffix && slots.suffix({ name: "suffix" })}
      </>
    );
  },
});

// defineComponent() setup composition API
export default defineComponent({
  // 其他配置
  setup() {
    const counter = ref(0);
    const condition = ref(true);
    const list = ref<string[]>(["abc", "cba"]);
    // 返回 jsx
    return () => (
      <>
        <div class={styles.baseFrame}>TestTsx</div>
        <input type="text" v-model={counter.value} />
        {/* v-if */}
        <div>{condition.value ? <span>yes</span> : <span>no</span>}</div>
        {/* v-for */}
        <div>
          {list.value.map((data, index) => (
            <p class={styles.baseColor} key={index}>
              {data}
            </p>
          ))}
        </div>
        {/* 插槽 v-slot */}
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
        {/* 使用elementUIPlus组件 */}
        <ElButton class={styles.ElButton}>点我点我</ElButton>
      </>
    );
  },
});
