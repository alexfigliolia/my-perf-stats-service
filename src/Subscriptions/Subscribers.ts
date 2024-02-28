import { Subscriptions } from "@alexfigliolia/my-performance-async";
import { RepositoryStatsPulls } from "./RepositoryStatsPulls";

export const Subscribers = new Subscriptions(RepositoryStatsPulls);
