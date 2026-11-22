import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  RotateCcw,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  joined: string;
  lastLogin: string;
}

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Kancelaria Prawna Omega",
    email: "biuro@omega-legal.pl",
    role: "Firma (B2B)",
    plan: "Subskrypcja PRO",
    status: "Aktywny",
    joined: "2023-01-15",
    lastLogin: "2 min temu",
  },
  {
    id: 2,
    name: "Jan Kowalski",
    email: "jan.k@gmail.com",
    role: "Klient Ind.",
    plan: "Standard",
    status: "Aktywny",
    joined: "2023-05-20",
    lastLogin: "1 dzień temu",
  },
  {
    id: 3,
    name: "Anna Nowak (Mec.)",
    email: "anna.nowak@lexportal.pl",
    role: "Operator Prawny",
    plan: "-",
    status: "Aktywny",
    joined: "2022-11-01",
    lastLogin: "Teraz",
  },
  {
    id: 4,
    name: "Startup Sp. z o.o.",
    email: "kontakt@startup.io",
    role: "Firma (B2B)",
    plan: "Subskrypcja",
    status: "Zaległość",
    joined: "2023-08-10",
    lastLogin: "5 dni temu",
  },
  {
    id: 5,
    name: "Piotr Wiśniewski",
    email: "p.wisniewski@onet.pl",
    role: "Klient Ind.",
    plan: "Standard",
    status: "Zablokowany",
    joined: "2023-09-01",
    lastLogin: "30 dni temu",
  },
  {
    id: 6,
    name: "Maria Lewandowska",
    email: "m.lewandowska@wp.pl",
    role: "Klient Ind.",
    plan: "Standard",
    status: "Aktywny",
    joined: "2023-11-02",
    lastLogin: "3 godz. temu",
  },
];

export const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [filter, setFilter] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle>Baza Klientów</CardTitle>
          <CardDescription>
            Zarządzaj profilami i uprawnieniami użytkowników.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Szukaj..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 w-64 bg-slate-50 dark:bg-slate-900 border-none shadow-sm"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <UserPlus className="h-4 w-4" /> Dodaj
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead className="font-bold">Użytkownik</TableHead>
              <TableHead className="font-bold">Rola</TableHead>
              <TableHead className="font-bold">Plan</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Dołączył</TableHead>
              <TableHead className="text-right font-bold">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {user.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "Aktywny"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                        : user.status === "Zaległość"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-none"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">{user.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opcje</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onClick={() => alert("Edycja profilu...")}
                      >
                        <Edit className="h-4 w-4 text-blue-500" /> Edytuj profil
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onClick={() => alert("Resetowanie hasła...")}
                      >
                        <RotateCcw className="h-4 w-4 text-amber-500" /> Resetuj
                        hasło
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="gap-2 text-red-600 cursor-pointer"
                        onClick={() => alert("Archiwizacja...")}
                      >
                        <Trash2 className="h-4 w-4" /> Zarchiwizuj
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
