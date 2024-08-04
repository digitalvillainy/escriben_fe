<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user.ts';

const userStore = useUserStore();
const uploadPic = ref<HTMLInputElement>();
const outputPic = ref<HTMLImageElement>();
let base64Image = ref(null);

//Computed property for profile picture
const profilePic = (): string | null => {
	if (userStore.getUser?.profile_pic !== null) {
		return userStore.getUser.profile_pic;
	} else {
		return null;
	};
};

//Convert image to base64 and call submitPic()
const updateProfilePic = (event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			base64Image.value = reader.result;
			submitPic({
				id: userStore.getUser.id,
				profile_pic: base64Image.value
			});
		};
		reader.onerror = (error) => {
			console.error('Error convwerting image: ', error);
		};
	}
};

//Upload profile picture to DB
const submitPic = async (payload: object): Promise<void> => {
	try {
		await userStore.uploadProfilePic(payload);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	base64Image.value = profilePic();
});

</script>
<template>
	<div class="flex flex-col space-y-8">
		<svg v-if="base64Image === null" viewBox="0 0 226 221" fill="none" xmlns="http://www.w3.org/2000/svg"
			@click="() => uploadPic.click()" class="cursor-pointer size-56">
			<ellipse cx="113" cy="110.5" rx="113" ry="110.5" fill="#D9D9D9" />
			<g clip-path="url(#clip0_66_400)">
				<path
					d="M112.5 110.714C122.275 110.714 131.65 106.831 138.562 99.9191C145.474 93.007 149.357 83.6323 149.357 73.8571C149.357 64.082 145.474 54.7073 138.562 47.7952C131.65 40.8832 122.275 37 112.5 37C102.725 37 93.3501 40.8832 86.4381 47.7952C79.526 54.7073 75.6429 64.082 75.6429 73.8571C75.6429 83.6323 79.526 93.007 86.4381 99.9191C93.3501 106.831 102.725 110.714 112.5 110.714ZM99.3409 124.536C70.9781 124.536 48 147.514 48 175.877C48 180.599 51.8297 184.429 56.552 184.429H168.448C173.17 184.429 177 180.599 177 175.877C177 147.514 154.022 124.536 125.659 124.536H99.3409Z"
					fill="#2F2E41" />
				<title>CHANGE PROFILE PICTURE</title>
			</g>
			<defs>
				<clipPath id="clip0_66_400">
					<rect width="129" height="147.429" fill="white" transform="translate(48 37)" />
				</clipPath>
			</defs>
		</svg>

		<img v-if="base64Image !== null" :src="base64Image" class="size-56 rounded-full object-cover" />
		<input type="file" class="hidden" ref="uploadPic" accept="image/*" @change="updateProfilePic" />
	</div>
</template>
