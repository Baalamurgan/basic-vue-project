<script setup lang="ts">
import FollowingVue from '@/components/notifications/Following.vue';
import ArchiveVue from '@/components/notifications/Archive.vue';
import NotificationsVue from '@/components/notifications/Notifications.vue';
import TabsVue from '@/components/Tabs.vue';
import { ref } from 'vue';

export interface Tab {
    title: string;
    component: Object;
}
const activeTab = ref('All');
const changeActiveTab = (newTab: string) => {
    activeTab.value = newTab;
}
const sampleTabsData = ref([{
    title: 'All',
    component: NotificationsVue
},
{
    title: 'Following',
    component: FollowingVue
},
{
    title: 'Archive',
    component: ArchiveVue
}])
const allMessagesRead = ref(false);
const markAllAsRead = () => {
    allMessagesRead.value = allMessagesRead.value ? false : true;
}
</script>

<template>
    <div class="rounded-xl bg-white text-black">
        <div class="flex items-center justify-between py-5 px-8">
            <h1 class="font-bold text-2xl">Notifications</h1>
            <p class="underline font-semibold hover:cursor-pointer" @click="markAllAsRead()">{{allMessagesRead ?
            "Mark all as unread" : 'Mark all as read'}}</p>
        </div>
        <TabsVue :tabs="sampleTabsData" :activeTab="activeTab"
            @change-active-tab-emitter="(newTab) => changeActiveTab(newTab)" :allMessagesRead="allMessagesRead">
        </TabsVue>
    </div>
</template>