import { defineComponent, ref, reactive, computed } from "vue";
export default defineComponent({
  name: "readingRecord",
  props: {
    message: String,
  },
  emits: ["change"],
  setup(props, { emit }) {
    // 调用 ref() 时传入一个泛型参数
    const num = ref<string | number>(10);
    num.value = "10";
    // 标注一个 reactive 变量的类型，我们可以使用接口
    interface Book {
      title: string;
      year?: number;
    }
    const book: Book = reactive({ title: "嘻嘻" });
    // computed() 会自动从其计算函数的返回值上推导出类型：
    const count = ref(0);
    const double = computed(() => count.value * 2);
    // const result = double.value.split('') // ×

    return () => (
      <div>
        {props.message}
        <button onClick={() => emit("change")}></button>
      </div>
    );
  },
});
