import { useState, useEffect } from "react";
const BlurBehindPointer = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	useEffect(() => {
		const handleMouseMove = (event:any) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="position-fixed top-0 left-0 w-100 h-100">
			<div
			className="blur-blob"
			style={{
				position: "absolute",
				top: `${mousePosition.y - 1200}px`,
				left: `${mousePosition.x - 1200}px`,
			}}
		></div>
		</div>
	);
};

export default BlurBehindPointer;
