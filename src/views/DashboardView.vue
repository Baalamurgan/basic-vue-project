<script lang="ts">
import NotificationsVue from '@/components/Notifications.vue';
import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);
        const increment = () => ++count.value;
        const decrement = () => --count.value;
        return {
            count,
            increment,
            decrement
        };
    },
    components: { NotificationsVue }
}
</script>

<template>
    <NotificationsVue></NotificationsVue>
</template>