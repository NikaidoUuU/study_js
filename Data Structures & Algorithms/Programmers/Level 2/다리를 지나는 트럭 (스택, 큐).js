function solution(bridge_length, weight, truck_weights) {
  const copy_trucks = truck_weights.slice(0);
  const cross_trucks = [];
  let time = 0;
  let bridge_weight = 0;

  while (copy_trucks.length > 0 || cross_trucks.length > 0) {
    const truck = copy_trucks[0];
    time++;

    if (cross_trucks[0] && cross_trucks[0].time + bridge_length === time) {
      bridge_weight -= cross_trucks.shift().weight;
    }

    if (weight >= truck + bridge_weight) {
      bridge_weight += truck;
      cross_trucks.push({ time: time, weight: truck });
      copy_trucks.shift();
    }
  }

  return time;
}
