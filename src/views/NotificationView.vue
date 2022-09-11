<script lang="ts">
import FollowingVue from '@/components/notifications/Following.vue';
import ArchiveVue from '@/components/notifications/Archive.vue';
import NotificationsVue from '@/components/notifications/Notifications.vue';
import TabsVue from '@/components/Tabs.vue';
import { ref } from 'vue';

export interface Tab {
    title: string;
    count?: number;
    component: Object;
}
export default {
    setup() {
        const count = ref(0);
        const increment = () => ++count.value;
        const decrement = () => --count.value;
        const activeTab = ref('All');
        const changeActiveTab = (newTab: string) => {
            activeTab.value = newTab;
        }
        const sampleTabsData = ref([{
            title: 'All',
            count: 8,
            component: NotificationsVue
        },
        {
            title: 'Following',
            count: 6,
            component: FollowingVue
        },
        {
            title: 'Archive',
            component: ArchiveVue
        }])
        const allMessagesRead = ref(false);
        const markAllAsRead = () => {
            allMessagesRead.value = true;
        }
        return {
            count,
            increment,
            decrement,
            activeTab,
            sampleTabsData,
            markAllAsRead,
            changeActiveTab
        };
    },
    components: { NotificationsVue, TabsVue }
}
</script>

<template>
    <div class="rounded-xl bg-white text-black min-w-[400px]">
        <div class="flex items-center justify-between py-5 px-8">
            <h1 class="font-bold text-2xl">Notifications</h1>
            <p class="underline font-semibold hover:cursor-pointer" @click="markAllAsRead()">Mark all as read</p>
        </div>
        <TabsVue :tabs="sampleTabsData" :activeTab="activeTab"
            @change-active-tab-emitter="(newTab) => changeActiveTab(newTab)" :allMessagesRead="allMessagesRead">
        </TabsVue>
    </div>
</template>