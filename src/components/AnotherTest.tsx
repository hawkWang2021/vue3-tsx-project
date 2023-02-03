import { defineComponent } from "vue";
import { isEmpty, uniqueArr, reverseStr } from "@/utils";
export default defineComponent({
  name: "AnotherTest",
  setup() {
    console.log(uniqueArr([1, 1, 1, 2, 2, 2, 3, 3, 3]));
    console.log(isEmpty({}));
    console.log(isEmpty({ name: "小王" }));
    console.log(reverseStr("12345"));

    //  ! TS泛型
    function identity<T>(arg: T): T {
      return arg;
    }
    console.log('identity("rua")', identity("rua"));
    console.log("identity(123456)", identity(123456));
    return () => {
      return <div>AnotherTest</div>;
    };
  },
});
