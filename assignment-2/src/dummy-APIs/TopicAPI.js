import { models } from "../database";

const topicAPI = {
  //! Just suppose to get data from database
  fetchAll() {
    const data = models.Topic.fetchTopics();
    return data;
  },
  create(topicData) {
    const topic = models.Topic.create(topicData);
    return topic;
  },
  findOneAndRemove(id) {
    const data = models.Topic.findOneAndRemove(id);
    return data;
  },
  fetchTopicsByFilters({ search = "" }) {
    const topicDocArr = models.Topic.fetchTopics();
    const topicDocArrFiltered = topicDocArr.filter((topic) => {
      return search === ""
        ? true
        : topic.name.toLowerCase().indexOf(search) !== -1;
    });
    return topicDocArrFiltered;
  },
};

export default topicAPI;
