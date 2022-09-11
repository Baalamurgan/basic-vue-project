<script setup lang="ts">
import ArchiveVue from '@/components/notifications/Archive.vue';
import FollowingVue from '@/components/notifications/Following.vue';
import NotificationsVue from '@/components/notifications/Notifications.vue';
import TabsVue from '@/components/Tabs.vue';
import moment from 'moment';
import { ref } from 'vue';

const dateNow = new Date()

const sampleAllNotifications = ref<any>(
    [{
        name: 'Anna Srzand',
        photo: "https://fakeimg.pl/100",
        item_type: 'join',
        metadata: {
            title: 'Final Presentation'
        },
        group: 'Social Media Plan',
        emoji: '🔥',
        date: moment(dateNow).subtract(2, 'hours'),
        read: false,
        status: 'online'
    },
    {
        name: 'Jess Raddon',
        item_type: 'mention',
        metadata: {
            title: 'Final Presentation',

        },
        group: 'Hobby List',
        emoji: '😍',
        date: moment(dateNow).subtract(4, 'hours'),
        read: false,
        status: 'none'
    },
    {
        name: 'Sandra Marx',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        group: 'Hobby List',
        metadata: {
            title: 'Plan'
        },
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Adam Smith',
        photo: "https://fakeimg.pl/100",
        item_type: 'file',
        group: 'Hobby List',
        metadata: {
            size: '2mb',
            filename: 'landing_page_ver2',
            type: 'fig'
        },
        title: 'Final Presentation',
        date: moment(dateNow).subtract(1, 'days'),
        read: true,
        status: 'none'
    },
    {
        name: 'Ralpg Turner',
        item_type: 'edited',
        group: 'Hobby List',
        emoji: '🥂',
        metadata:
        {

            title: 'Celebrated Info',
            oldMessage: "Let's add it to the main documentary",
            newMessage: "Let's add it to the secret documents",
        },
        date: moment(dateNow).subtract(4, 'hours'),
        read: true,
        status: 'none'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {},
    {}
    ]
)
const sampleFollowingNotifications = ref<any>(
    [{
        name: 'Anna Srzand',
        photo: "https://fakeimg.pl/100",
        item_type: 'join',
        metadata: {
            title: 'Final Presentation'
        },
        group: 'Social Media Plan',
        emoji: '🔥',
        date: moment(dateNow).subtract(2, 'hours'),
        read: false,
        status: 'online'
    },
    {
        name: 'Jess Raddon',
        item_type: 'mention',
        metadata: {
            title: 'Final Presentation',

        },
        group: 'Hobby List',
        emoji: '😍',
        date: moment(dateNow).subtract(4, 'hours'),
        read: false,
        status: 'none'
    },
    {
        name: 'Sandra Marx',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        group: 'Hobby List',
        metadata: {
            title: 'Plan'
        },
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Adam Smith',
        photo: "https://fakeimg.pl/100",
        item_type: 'file',
        group: 'Hobby List',
        metadata: {
            size: '2mb',
            filename: 'landing_page_ver2',
            type: 'fig'
        },
        title: 'Final Presentation',
        date: moment(dateNow).subtract(1, 'days'),
        read: true,
        status: 'none'
    },
    {
        name: 'Ralpg Turner',
        item_type: 'edited',
        group: 'Hobby List',
        emoji: '🥂',
        metadata:
        {

            title: 'Celebrated Info',
            oldMessage: "Let's add it to the main documentary",
            newMessage: "Let's add it to the secret documents",
        },
        date: moment(dateNow).subtract(4, 'hours'),
        read: true,
        status: 'none'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    {
        name: 'Dan Merix',
        photo: "https://fakeimg.pl/100",
        item_type: 'upgrade_plan',
        metadata: {
            title: 'Plan',
        },
        group: 'Hobby List',
        date: moment(dateNow).subtract(12, 'hours'),
        read: true,
        status: 'busy'
    },
    ]
)

const activeTab = ref('All');
const changeActiveTab = (newTab: string) => {
    activeTab.value = newTab;
}
const sampleTabsData = ref([{
    title: 'All',
    component: NotificationsVue,
    data: sampleAllNotifications.value
},
{
    title: 'Following',
    component: FollowingVue,
    data: sampleFollowingNotifications.value
},
{
    title: 'Archive',
    component: ArchiveVue
}])
</script>

<template>
    <div class="rounded-xl bg-white text-black min-w-[400px] max-h-screen overflow-y-auto">
        <TabsVue :tabs="sampleTabsData" :activeTab="activeTab"
            @change-active-tab-emitter="(newTab) => changeActiveTab(newTab)">
        </TabsVue>
    </div>
</template>