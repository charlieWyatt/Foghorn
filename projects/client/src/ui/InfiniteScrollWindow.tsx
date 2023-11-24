import React, { useState, useEffect } from "react";

interface ImageData {
	id: string;
	author: string;
}

const InfiniteScrollWindow = () => {
	const [items, setItems] = useState<ImageData[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch(
			`https://picsum.photos/v2/list?page=${page}&limit=10`
		);
		const newData = await response.json();
		setItems([...items, ...newData]);
		setPage(page + 1);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleScroll = () => {
		const scrollContainer = document.querySelector(
			".infinite-scroll-container"
		);
		if (
			scrollContainer &&
			scrollContainer.scrollHeight - scrollContainer.scrollTop ===
				scrollContainer.clientHeight
		) {
			// Load more data when the scroll reaches the bottom
			fetchData();
		}
	};

	const containerStyle: React.CSSProperties = {
		background: "white",
		overflow: "hidden", // Hide the scroll bar
	};

	const scrollContainerStyle: React.CSSProperties = {
		height: "600px", // Set the desired height here
		overflowY: "scroll",
		scrollbarWidth: "none", // Hide the scrollbar for Firefox
		WebkitOverflowScrolling: "touch", // Enable smooth scrolling for WebKit
	};

	const itemStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "center", // Center horizontally
		alignItems: "center", // Center vertically
		margin: "20px 0", // Add margin above and below
	};

	return (
		<div style={containerStyle}>
			<div
				className="infinite-scroll-container"
				style={scrollContainerStyle}
				onScroll={handleScroll}
			>
				{items.map((item, index) => (
					<div key={index} className="item" style={itemStyle}>
						<img
							src={`https://picsum.photos/id/${item.id}/200/200`}
							alt={item.author}
						/>
					</div>
				))}
			</div>
			{loading && <div className="loading-indicator">Loading...</div>}
		</div>
	);
};

export default InfiniteScrollWindow;
