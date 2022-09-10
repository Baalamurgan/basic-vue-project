<script setup lang="ts">
    import { toRefs } from 'vue';
    import { defineProps } from "vue";
    
    // const props = defineProps({
    //     anotification: Object as () => Notification,
    // });
    
    // const notification = JSON.parse(JSON.stringify(toRefs(props).anotification?.value)) as Notification
    </script>
    
    <template>
        <button class="px-2 py-1">
            <slot></slot>
        </button>
    </template>